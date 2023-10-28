import axios from 'axios';

export const handleUploadFile = async (args) => {
  console.log(args);
  // console.log(args.getHeaders());
  const response = await axios.post('http://127.0.0.1:5000/visualize', args);
  return response.data;
};
