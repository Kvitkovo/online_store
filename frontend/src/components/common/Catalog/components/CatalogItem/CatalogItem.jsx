// import React, { useState } from 'react';
// import { ICONS } from '../../ui-kit/icons';
// import styles from './Catalog.module.scss';
// import SubCategories from './SubCategoryList';
// import ModalCatalog from './ModalCatalog';
// import { useWindowSize } from '../../../hooks/useWindowSize';
// // import { NavLink } from 'react-router-dom';

// const CatalogItem = ({
//   depthLevel,
//   category,
//   handleCategoryClick,
//   setHoveredCategory,
// }) => {
//   const { width } = useWindowSize();
//   const { sortValue, children, bg, name, link, hasSubCategory, icon } =
//     category;
//   const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
//   const nameParts = name.split('  ');
//   const firstPart = nameParts[0];
//   const restParts = nameParts.slice(1).join(' ');

//   const toggleSubCategory = () => {
//     if (width <= 481) {
//       setIsSubCategoryOpen(!isSubCategoryOpen);
//     } else {
//       handleCategoryClick(link);
//     }
//   };

//   return (
//     <>
//       <li key={sortValue} className={styles.categoryItemWrapper}>
//         <a
//           onClick={toggleSubCategory}
//           className={styles.categoryLink}
//           onMouseOver={() =>
//             setHoveredCategory
//               ? setHoveredCategory({
//                   subCategories: children,
//                   bg: bg,
//                   name: name,
//                 })
//               : null
//           }
//         >
//           <span className={styles.categoryIcon}>{icon}</span>
//           <div className={styles.categoryItemContent}>
//             {firstPart === 'Акційна' ? (
//               <span className={styles.redText}>{firstPart}</span>
//             ) : (
//               <span className={styles.categoryItemText}>{firstPart}</span>
//             )}
//             <span className={styles.categoryItemText}>{restParts}</span>
//           </div>
//           {hasSubCategory && (
//             <ICONS.ArrowRightIcon
//               className={isSubCategoryOpen ? styles.icon : ''}
//             />
//           )}
//         </a>
//       </li>
//       {isSubCategoryOpen && children && children.length > 0 && (
//         <ModalCatalog>
//           <SubCategories
//             categories={children}
//             depthLevel={depthLevel}
//             handleCategoryClick={handleCategoryClick}
//           />
//         </ModalCatalog>
//       )}
//     </>
//   );
// };

// export default CatalogItem;

import React, { useState } from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from '../../Catalog.module.scss';
import SubCategories from '../SubCategoryList/SubCategoryList';
import ModalCatalog from '../ModalCatalog/ModalCatalog';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
// import { NavLink } from 'react-router-dom';

const CatalogItem = ({
  depthLevel,
  category,
  handleCategoryClick,
  setHoveredCategory,
}) => {
  const { width } = useWindowSize();
  const { sortValue, children, bg, name, link, hasSubCategory, icon } =
    category;
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const nameParts = name.split('  ');
  const firstPart = nameParts[0];
  const restParts = nameParts.slice(1).join(' ');

  const toggleSubCategory = () => {
    if (width <= 481) {
      setIsSubCategoryOpen(!isSubCategoryOpen);
    } else {
      handleCategoryClick(link);
    }
  };

  return (
    <>
      <li key={sortValue} className={styles.categoryItemWrapper}>
        <a
          onClick={toggleSubCategory}
          className={styles.categoryLink}
          onMouseOver={() =>
            setHoveredCategory
              ? setHoveredCategory({
                  subCategories: children,
                  bg: bg,
                  name: name,
                })
              : null
          }
        >
          <span className={styles.categoryIcon}>{icon}</span>
          <div className={styles.categoryItemContent}>
            {firstPart === 'Акційна' ? (
              <span className={styles.redText}>{firstPart}</span>
            ) : (
              <span className={styles.categoryItemText}>{firstPart}</span>
            )}
            <span className={styles.categoryItemText}>{restParts}</span>
          </div>
          {hasSubCategory && (
            <ICONS.ArrowRightIcon
              className={isSubCategoryOpen ? styles.icon : ''}
            />
          )}
        </a>
      </li>
      {isSubCategoryOpen && children && children.length > 0 && (
        <ModalCatalog category={name}>
          <SubCategories
            categories={children}
            depthLevel={depthLevel}
            handleCategoryClick={handleCategoryClick}
          />
        </ModalCatalog>
      )}
    </>
  );
};

export default CatalogItem;
