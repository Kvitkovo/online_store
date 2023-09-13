import axios from 'axios';

const getAllCards = async () => {
  try {
    const result = await axios.get('http://195.191.104.138:4446/v1/products');
    return result;
  } catch (error) {
    return error;
  }
};

export default getAllCards;
