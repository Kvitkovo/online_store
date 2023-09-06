import React from 'react';
import '../scss/Home.scss';
import Carousel from '../components/Carousel/Carousel';
// import IconButton from '../components/ui-kit/components/IconButton';
// import { ICONS } from '../components/ui-kit/icons';
// import Discount from '../components/ui-kit/components/Discount';
import data from '../data/carouselData.json';

const Home = () => {
  return (
    <div className="home">
      <Carousel data={data.slides} />
      {/* <Discount discount={15} />
      <Discount discount={15} isBigCard={true} />
      <IconButton icon={<ICONS.CartIcon />} isBorderYellow={true} />
      <IconButton icon={<ICONS.PencilIcon />} isBorderYellow={true} />
      <IconButton icon={<ICONS.BouquetIcon />} />
      <IconButton icon={<ICONS.CloseIcon />} />
      <IconButton icon={<ICONS.TrashIcon />} />
      <IconButton
        icon={<ICONS.ArrowLeftIcon />}
        isRound={true}
        isOpacity={true}
      />
      <IconButton
        icon={<ICONS.ArrowRightIcon />}
        isRound={true}
        isOpacity={true}
      />
      <IconButton
        icon={<ICONS.QuestionIcon />}
        isBackground={true}
        isRound={true}
      />
      <IconButton
        icon={<ICONS.MessageIcon />}
        isBackground={true}
        isRectangularWithPadding={true}
      />
      <IconButton
        icon={<ICONS.PhoneIcon />}
        isBackground={true}
        isRound={true}
      />
      <IconButton
        icon={<ICONS.CloseGreenIcon />}
        isRound={true}
        isRoundGreen={true}
      />
      <IconButton icon={<ICONS.InCartIcon />} isBorderGreen={true} /> */}
    </div>
  );
};

export default Home;
