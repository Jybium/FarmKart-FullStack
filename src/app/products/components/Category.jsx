import Image from "next/image";
import Link from "next/link";

const Category = ({ category }) => {
  return (
    <div className="grid w-full mx-auto text-center gap-1">
      <div className="w-[70px] h-[70px]">
        <Link
          href={{
            pathname: "/products",
            query: { product: `${category.name.toLowerCase()}` },
          }}
        >
          <Image
            src={category.image}
            alt="category image"
            className="rounded-full max-w-full object-cover h-[70px] block border-[1px] border-black"
          />
        </Link>
      </div>

      <p className="text-sm font-bold">{category.name}</p>
    </div>
  );
};

export default Category
