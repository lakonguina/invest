from fastapi import HTTPException

from sqlmodel import Session, select

from api.schemas.address import Address, AddressIn
from api.schemas.user import User
from api.crud.country import get_country
from api.crud.user import get_user_status


def create_address(session: Session, address: AddressIn, user: User) -> None:
	country = get_country(session, address.alpha3)
	
	if not country:
		raise HTTPException(
			status_code=400,
			detail="The country does not exist"
		)

	waiting_for_document_status = get_user_status(session, "waiting-for-document")
		
	db_address = Address(
		user=user,
		city=address.city,
		street=address.street,
		zip_code=address.zip_code,
		alpha3=address.alpha3,
	)

	user.status = waiting_for_document_status
	
	session.add(user)
	session.add(db_address)

	session.commit()
