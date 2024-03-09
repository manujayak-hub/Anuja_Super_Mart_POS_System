import { useHistory } from 'react-router-dom';

export const useCustomHistory = () => {
  const history = useHistory();

  const redirectToInventory = () => {
    history.push('/inventory');
  };

  // Add more custom routing functions as needed

  return {
    redirectToInventory
    // Add more functions here
  };
};
