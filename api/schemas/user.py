from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel

from api.schemas.address import Address, AddressIn, AddressOut
from api.schemas.country import Country, CountryIn
from api.schemas.email import Email, EmailField, EmailFieldOptional, EmailOut
from api.schemas.phone import Phone, PhoneField, PhoneFieldOptional, PhoneOut
from api.schemas.document import DocumentUser


class UserStatusOut(SQLModel):
	slug: str = Field(max_length=64)


class UserStatus(UserStatusOut, table=True):
	__tablename__ = "users_status"

	id_user_status: int = Field(primary_key=True)
	user: list["User"] = Relationship(back_populates="status")


class UserPasswordField(SQLModel):
	password: str = Field(max_length=64)


class UserBase(SQLModel):
    first_name: str = Field(max_length=64, min_length=1)
    last_name: str = Field(max_length=64, min_length=1)


class User(UserBase, UserPasswordField, table=True):
	__tablename__ = "users"

	id_user: int | None = Field(primary_key=True)
	id_user_status: int = Field(foreign_key="users_status.id_user_status")
	alpha3: str = Field(foreign_key="countries.alpha3")

	status: UserStatus = Relationship(back_populates="user")
	country: Country = Relationship(back_populates="user")

	address: Address = Relationship(
		back_populates="user",
		sa_relationship_kwargs={
			"primaryjoin": "and_(Address.id_user==User.id_user, Address.is_active==True)",
			"uselist": False,
			"viewonly": True,
		}
	)

	email: Email = Relationship(
		back_populates="user",
		sa_relationship_kwargs={
			"primaryjoin": "and_(Email.id_user==User.id_user, Email.is_active==True)",
			"uselist": False,
			"viewonly": True,
		}
	)

	phone: Phone = Relationship(
		back_populates="user",
		sa_relationship_kwargs={
			"primaryjoin": "and_(Phone.id_user==User.id_user, Phone.is_active==True)",
			"uselist": False,
			"viewonly": True,
		}
	)

	document: list[DocumentUser] | None = Relationship(back_populates="user")


class UserCreate(UserBase, UserPasswordField):
	phone: PhoneField | None
	email: EmailField | None
	country: CountryIn
	address: AddressIn


class UserCreatePerson(UserPasswordField, PhoneField, UserBase):
	country: CountryIn


class UserLoginByEmail(EmailField, UserPasswordField):
	pass


class UserInformation(UserBase):
	status: UserStatusOut
	phone: PhoneOut
	country: Country
	address: AddressOut | None
	document: list[DocumentUser] | None
