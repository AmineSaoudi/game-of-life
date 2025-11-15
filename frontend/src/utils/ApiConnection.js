const API_BASE_URL = 'http://10.121.13.65:3000/api';


export const testConnectivity = async () => {
  console.log('🌐 Testing basic connectivity to API...');

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      // 🔹 Remove headers for this simple GET (see below)
    });
    console.log(response.json());

    console.log('📶 Connection Status:', response.status);
    return response.status < 500;
  } catch (error) {
    console.log('❌ Cannot reach API:', error.message);
    return false;
  }
};

window.testAPI = {
  testConnectivity}
  export default { testConnectivity };