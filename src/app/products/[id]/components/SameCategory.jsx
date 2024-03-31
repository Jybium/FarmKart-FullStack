import React from "react";
import Product from "../../components/Product";




const SameCategory = async ({ category, product}) => {

const products = await prisma.product.findMany({
    where:{category: category, Id:{not: product.Id} },
  include: {
    image: { select: { Image: true } },
    user: {
      select: {
        Id:true,
        firstName: true,
        lastName: true,
        emailAddress: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        location: true,
      },
    },
  },
});


  return (
    <section className="sm:flex grid sm:gap-3 gap-2 py-3">
      {products?.length > 0 && (
        <div>
            {products?.map((item)=> 
            
          <Product product={item} key={item.Id}/>
            )}
        </div>
      )}
      {products?.length <= 0 && (
        <h3 className="grid justify-center font-black text-lg my-3 text-center">
          No more products from this category. 😥😪
        </h3>
      )}
    </section>
  );
};

export default SameCategory;
