const API_BASE_URL = '';


export const testConnectivity = async () => {
  console.log('🌐 Testing basic connectivity to API...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/Users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // change to out headers
      },
    });
    
    console.log('📶 Connection Status:', response.status);
    return response.status < 500; // Consider anything below 500 as "reachable"
  } catch (error) {
    console.log('❌ Cannot reach API:', error.message);
    return false;
  }
};

window.testAPI = {
  testConnectivity}