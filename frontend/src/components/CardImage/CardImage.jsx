import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// const styles = {
//   media: {
//     height: "100%",
//     paddingTop: '25%', // 16:9,
//     marginTop:'30',
//     width: '100%',
//     backgroundSize:"cover",
//     objectFit: "cover"
//   }
// };

 const CardImage = ({ 
  Button,CardContent,CardActions,children
    
  })=> {
  return (
    <Card sx={{ maxWidth: 600 }}>
         {children}
    </Card>
  );
}




export default CardImage;

