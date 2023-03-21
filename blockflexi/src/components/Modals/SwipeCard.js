import React, { useState } from 'react';
import{ Card,CardActions }from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SwipeableCard = ({ cardItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
 
  const handleSwipe = (direction) => {
    if (direction === 'left' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === 'right' && activeIndex < cardItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <Card sx={{width:'500px',maxHeight:'380px',margin:'120px 0px 0px 80px'}}>
        {cardItems[activeIndex].cardMedia}
        {cardItems[activeIndex].cardTitle}
        {cardItems[activeIndex].cardContent}
          
      
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          aria-label="previous card"
          disabled={activeIndex === 0}
          onClick={() => handleSwipe('left')}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          aria-label="next card"
          disabled={activeIndex === cardItems.length - 1}
          onClick={() => handleSwipe('right')}
        >
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SwipeableCard;
