from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, UploadFile

from sqlmodel import Session

from api.core.database import get_session
from api.core.settings import settings

from api.dependencies.security import password_check, verify_password, create_jwt, decode_jwt, has_access, get_password_hash, JWTSlug

from api.dependencies.email import validate_email, reset_password

from api.schemas.detail import Detail
from api.schemas.document import DocumentUserTypeSlug
from api.schemas.user import UserCreate, UserCreatePerson, UserInformation, UserLoginByEmail, UserPasswordField
from api.schemas.address import AddressIn
from api.schemas.token import Token
from api.schemas.email import EmailField

from api.crud.email import get_email, get_email_by_id, get_email_by_user
from api.crud.phone import get_phone
from api.crud.user import create_user, get_user_by_email, get_user_by_id


router = APIRouter(tags=["Users"])

@router.post("/user/register/person", response_model=Token)
def user_register(
	user: UserCreatePerson,
	session: Session = Depends(get_session),
):
	phone = get_phone(session, user.phone)

	if phone:
		raise HTTPException(
			status_code=409,
			detail="Phone is already registered and active"
		)

	db_user = create_user(session, user)

	access_token = create_jwt(
		str(db_user.id_user),
		JWTSlug.access,
	)

	return {
		"access_token": access_token,
		"token_type": "bearer"
	}


@router.post("/user/register/address", response_model=Detail)
def user_register_address(
	address: AddressIn,
	session: Session = Depends(get_session),
    id_user: int = Depends(has_access),
):
	user = get_user_by_id(sessions, id_user)

	if user.status.slug != "waiting-for-address":
		raise HTTPException(
			status_code=409,
			detail="Phone is already registered and active"
		)
		
	#id_user: int  = decode_jwt(jwt, JWTSlug.information)
	return {"test": "test"}


@router.post("/user/login/email", response_model=Token)
def user_login_by_email(
	user: UserLoginByEmail,
	session: Session = Depends(get_session),
):
	db_user = get_user_by_email(session, user.email)

	if not db_user:
		raise HTTPException(
			status_code=400,
			detail="Wrong email"
		)

	password_is_good = verify_password(user.password, db_user.password)

	if not password_is_good:
		raise HTTPException(
			status_code=400,
			detail="Wrong password"
		)

	access_token = create_jwt(
		str(db_user.id_user),
		JWTSlug.access,
	)

	return {
		"access_token": access_token,
		"token_type": "bearer"
	}


@router.get("/user/information", response_model=UserInformation)
def user_information(
	session: Session = Depends(get_session),
    id_user: int = Depends(has_access),
):
	db_user = get_user_by_id(session, id_user)

	return db_user
