/**
 * External dependencies
 */
import { Box, Modal } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 400,
    color: 'black',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const InsufficientBalance = (props) => {
    const {onClose} = props;

    return (
      <Modal open onClose={onClose}>
          <Box sx={style}>
              <h2>Insufficient balance!</h2>

              <p>Please insert more coins.</p>
          </Box>
      </Modal>
    );
}

export default InsufficientBalance;