import React, { useMemo } from 'react';
import Productcard from './Productcard';
import { useAppContext } from '../context/AppContext';

function BestSeller() {
    const { products } = useAppContext();

    const inStockProducts = products?.filter(p => p.inStock) || [];

    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    // Shuffle once per mount, ignore cart changes
    const bestSellers = useMemo(() => shuffleArray(inStockProducts).slice(0, 5), [products]);

    if (bestSellers.length === 0) return null;

    return (
        <section className='mt-10 px-3 sm:px-6'>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8'>
                {bestSellers.map((product, index) => (
                    <div key={product.id || index} className='group relative'>
                        <Productcard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BestSeller;
