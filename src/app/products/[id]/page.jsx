import SameCategory from "./components/SameCategory";
import Header from "../../components/Header";
import Images from "./components/Images";
import Details from "./components/Details";

import prisma from "../../lib/prisma";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { Id: true },
  });

  return products.map((product) => ({
    id: product.Id.toString(),
  }));
}

const page = async ({ params }) => {
  const param = +params.id;

  const product = await prisma.product.update({
    where: {
      Id: param, // Assuming 'param' corresponds to the product ID
    },
    data: { views: { increment: 1 } },
    include: {
      image: { select: { Image: true } },
      Review: { select: { rating: true, comment: true } },
      user: {
        select: {
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

  const responseImage = product?.image;
  const responseDetails = product;
  const responseUser = product?.user;

  return (
    <main>
      <Header className="bg-white" />
      <main className="sm:mx-28 w-[90%] m-auto sm:m-0 relative top-[80px] overflow-scroll h-[calc(100%-80px)] pb-20 Hide">
        <section className="sm:flex grid sm:gap-5 gap-3 py-10">
          <Images image={responseImage} />
          <Details details={responseDetails} user={responseUser} />
        </section>
        <section>
          <h3 className="font-black text-lg">People also check</h3>

          <SameCategory
            category={responseDetails.category}
            product={responseDetails}
          />
        </section>
      </main>
    </main>
  );
};

export default page;
