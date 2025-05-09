## Endpoints

- Login
http://localhost:8000/api/auth/login -> POST request
{
    username:"",
    password: ""
}

- Sign up 
http://localhost:8000/api/auth/register/ => POST request
{
    email: "",
    username: "",
    password: "",
    role: "USER" | "GUEST" | "ADMIN"
}x