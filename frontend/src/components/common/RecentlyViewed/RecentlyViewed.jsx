import React, { useEffect, useMemo, useState } from 'react';
import Slider from './Slider';
import styles from './RecentlyViewed.module.scss';
import { useParams } from 'react-router-dom';
import { GetProducts } from '../../../services/products/productsAccess.service';

const RecentlyViewed = React.memo(() => {
  const recentlyViewed = useMemo(
    () => Array.from(JSON.parse(localStorage.getItem('recentlyViewed') || '')),
    [],
  );
  const { myId } = useParams();

  const [receivedData, setReceivedData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataForAll = async () => {
      setLoading(true);
      try {
        const requests = recentlyViewed.map(async (id) => {
          return await GetProducts(id);
        });
        requests &&
          (await Promise.all(requests).then((value) => {
            const result = value.filter((item) => {
              return item.id !== +myId;
            });
            setReceivedData(result);
          }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForAll();
  }, [myId, recentlyViewed]);

  return (
    <>
      {recentlyViewed.length > 1 && (
        <div className={styles.container}>
          <h2 className={styles.title}>Раніше переглянуті</h2>
          {!isLoading && <Slider data={receivedData} />}
        </div>
      )}
    </>
  );
});

export default RecentlyViewed;
