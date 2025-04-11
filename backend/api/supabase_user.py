from fastapi import APIRouter, Depends
from ..services import SupabaseUserService
from ..models.user_model import User, UserTypeEnum

from typing import List


api = APIRouter(prefix="/api/supabaseuser")

openapi_tags = {
    "name": "Supabase Users",
    "description": "User profile search and related operations.",
}


@api.get("/", response_model=User, tags=["Supabase Users"])
def get_user(id: str, user_svc: SupabaseUserService = Depends()):
    return user_svc.get_user(id)


@api.post("/", response_model=User, tags=["Supabase Users"])
def create_user(
    id: str,
    email: str,
    password: str,
    role: UserTypeEnum,
    user_svc: SupabaseUserService = Depends(),
):
    subject = user_svc.get_user(id)
    if subject.role != UserTypeEnum.ADMIN:
        raise Exception(f"Insufficient permissions for user {subject.uuid}")
    return user_svc.create_user(email=email, password=password, role=role)


@api.put("/", response_model=User, tags=["Supabase Users"])
def update_user(uuid: str, user: User, user_svc: SupabaseUserService = Depends()):
    subject = user_svc.get_user(uuid)
    if subject.role != UserTypeEnum.ADMIN:
        raise Exception(f"Insufficient permissions for user {subject.uuid}")

    return user_svc.update_user(user)


@api.delete("/", response_model=None, tags=["Supabase Users"])
def delete_user(uuid: str, user: User, user_svc: SupabaseUserService = Depends()):
    subject = user_svc.get_user(uuid)
    if subject.role != UserTypeEnum.ADMIN:
        raise Exception(f"Insufficient permissions for user {subject.uuid}")

    return user_svc.delete_user(user.id)


@api.get("/login", response_model=List[User], tags=["Supabase Users"])
def login_user(
    email: str,
    password: str,
    user_svc: SupabaseUserService = Depends(),
):
    return user_svc.login_user(email=email, password=password)


@api.get("/logout", response_model=User, tags=["Supabase Users"])
def logout_user(
    id: str,
    user_svc: SupabaseUserService = Depends(),
):
    return user_svc.logout_user(id=id)


@api.get("/forgot-password", response_model=User, tags=["Supabase Users"])
def forgot_password(
    email: str,
    user_svc: SupabaseUserService = Depends(),
):
    return user_svc.forgot_password(email=email)


@api.get("/update-password", response_model=User, tags=["Supabase Users"])
def update_password(
    id: str,
    new_password: str,
    user_svc: SupabaseUserService = Depends(),
):
    return user_svc.update_password(new_password=new_password)
