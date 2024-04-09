import React from "react";
import { GrCheckmark } from "react-icons/gr";
import { GrWaypoint } from "react-icons/gr";

const Checkout = ({data}) => {

    const cart = data?.response?.data;

  return (
    <main className="sm:w-[50%] w-full">
      <p className="font-black text-sm my-5">CHECKOUT</p>
      <section>
        {/* FOR THE FIRST ITEM IN THE ADDRESS COLUMN */}
        <div className="border-[1px] border-black rounded">
          <div className="flex items-center justify-between border-b-[1px] border-black px-3 py-2 text-xs">
            <p className="flex items-center gap-5 font-black">
              <span className="p-[6px] border-[1px] border-black rounded-full">
                <GrCheckmark size="8" />
              </span>{" "}
              <span>1. ADDRESS DETAILS</span>
            </p>
           
          </div>
          <div className="ml-10 text-xs my-2 grid gap-2">
            <p className="text-sm">{data?.user?.firstName} {data?.user?.lastName}</p>
            <p>{data?.user?.location}, Nigeria.</p>
            <p>{data?.user?.phoneNumber}</p>
          </div>
        </div>

        {/* FOR THE DELIVERY METHOD */}
        <div className="border-[1px] border-black rounded mt-8">
          <div className="flex items-center justify-between border-b-[1px] border-black px-3 py-2 text-xs">
            <p className="flex items-center gap-5 font-black">
              <span className="p-[6px] border-[1px] border-black rounded-full bg-[#003800]">
                <GrCheckmark size="8" />
              </span>{" "}
              <span>2. DELIVERY METHOD</span>
            </p>
            <p className="text-[#003800] font-black">EDIT</p>
          </div>
          <section className="p-3">
            <div className="">
              <p className="font-bold text-sm capitalize my-5">
                delivered between 2 - 3 days
              </p>
              <div className="grid gap-3 my-3 border-[1px] border-black text-xs p-3">
                <p className="flex gap-3 items-center">
                  <span className="font-black text-xl text-center">
                    &#x2022;
                  </span>
                  Free delivery within the same town.
                </p>
                <p className="flex gap-3 items-center">
                  <span className="font-black text-xl text-center">
                    &#x2022;
                  </span>
                  Payment of delivery outside the current location and varies
                  per distance.
                </p>
                <p className="flex gap-3 items-center">
                  <span className="font-black text-xl text-center">
                    &#x2022;
                  </span>
                  Large items may arrive 3 business days later than fewer
                  products.
                </p>
                <p className="flex gap-3 items-center">
                  <span className="font-black text-xl text-center">
                    &#x2022;
                  </span>
                  Ensure your address is correct as our Delivery Agents would
                  only delivery to stated address.
                </p>
                <p className="flex gap-3 items-center">
                  <span className="font-black text-xl text-center">
                    &#x2022;
                  </span>
                  You may decide to visit our delivery station for pick up when
                  it arrives to your destinaton.
                </p>
              </div>
            </div>
            <div>
              <p className="pl-10 font-black border-black px-3 border-x-[1px] border-t-[1px] py-2 text-xs border-collapse">
                SHIPMENT DETAILS
              </p>
              <div className="pl-5 text-xs py-2 grid gap-2 border-[1px] border-black border-collapse">
                <p className="text-sm">Shipment {cart?.length} of {cart?.length}</p>
                {Cart.map((data) => 
                
                <p>{data?.product?.Quantity} x{ data?.product?.productName}</p>
                )}
                <p>Delivered between 2 - 3 days</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
