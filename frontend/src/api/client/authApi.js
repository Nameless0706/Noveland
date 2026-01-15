import { clientInstance } from "../../utils/apiClient";

export const login = async (email, password) => {
  try {
    const response = await clientInstance.post("/auth/login", {
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async (display_name, email, password) => {
  try{
    const response = await clientInstance.post("/auth/register", {
      display_name,
      email,
      password
    });
    return response;
  } catch (error){
    console.log(error);
    throw error;
  }
}
