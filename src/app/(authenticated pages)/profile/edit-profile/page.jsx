import Header from "../../../components/Header";
import Image from "next/image";
import Profile from "@/Asset/FARMKART IMAGES/images/profile-image.jpg";
import Link from "next/link"
import Form from "../edit-profile/components/Form"


const page = () => {


  return (

    <main>
      <Header className="bg-white" />
      <main className="w-5/6 mx-auto py-10 relative top-[80px] h-[calc(100%-80px)] overflow-scroll pb-20 Hide">
        <h1 className="font-black text-lg my-4">My Profile</h1>
        <section className="flex items-center justify-between my-5">
          <div className="flex items-center gap-4">
            <Image
              src={Profile}
               
               
              className="rounded-full w-16 h-16"
            />
            <p className="font-black">James Abel</p>
          </div>
          <Link
            href="/products"
            className="text-[#003800] font-black sm:tracking-wide sm:text-base text-sm"
          >
            Back To HomePage
          </Link>
        </section>
        <section className="w-full">
          <Form/>
        </section>
      </main>
    </main>
    
  );
};

export default page;
