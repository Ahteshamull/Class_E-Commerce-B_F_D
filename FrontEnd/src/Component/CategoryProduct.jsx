import React, { useEffect, useState } from "react";
import Container from "../layout/Container";
import { useParams } from "react-router";
import CategoryPageNation from "../Component/ProductCetagory/CetagoryPageNation";
import axios from "axios";

export default function CategoryProduct() {
  const [cetagory ,setCetagory] = useState([])
  const { id } = useParams();
  const SingleCetagory = async () => {
    await axios.get(`http://localhost:3000/api/v1/category/singleCetagory/${id}`)
      .then((response) => {
        setCetagory(response.data.singleCetagory);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    SingleCetagory();
  }, [id]);

  return (
    <div>
      <Container>
        <section className="ezy__epgrid2 light py-5  text-zinc-900 dark:text-white relative overflow-hidden z-10">
          <h2 className="text-2xl font-bold leading-none md:text-[40px] text-center">
            {cetagory.name}
          </h2>

          <div className="text-center ">
            <div className="ezy__epgrid2-button ">
              <CategoryPageNation itemsPerPage={1} />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
