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


const InsufficientQuantity = (props) => {
    const {onClose} = props;

    return (
      <Modal open onClose={onClose}>
          <Box sx={style}>
              <h2>Insufficient Quantity!</h2>

              <p>Please contact the vending machine administrator.</p>
          </Box>
      </Modal>
    );
}

export default InsufficientQuantity;