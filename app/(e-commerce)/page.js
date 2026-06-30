import React from "react";
import Banner from "../components/banner";
import Categories from "../components/categories";
import FeaturedProducts from "../components/featureProduts";

const page = () => {
  return (
    <>
      <Banner />
      <Categories />
      <FeaturedProducts />
    </>
  );
};

export default page;
