import React from 'react'
import Container from '../layout/Container';

import CategoryPageNation from '../Component/ProductCetagory/CetagoryPageNation';

export default function CategoryProduct() {
  return (
    <div>
      <Container>
        <section className="ezy__epgrid2 light py-5  text-zinc-900 dark:text-white relative overflow-hidden z-10">
          <h2 className="text-2xl font-bold leading-none md:text-[40px] text-center">
            Product Category
          </h2>

          <div className="text-center ">
            <div className="ezy__epgrid2-button ">
              <CategoryPageNation itemsPerPage={1}/>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
