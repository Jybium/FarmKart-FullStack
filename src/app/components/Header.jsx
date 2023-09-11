import React from "react";
import Image from "next/image";
import Logo from "@/app/logo (2).png";
import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "@/app/components/Buttons";
import Navlink from "@/app/components/Navlink";

const Header = (props) => {
  // const [item, setItem] = useState();
  // const item = useRef(1);

  // const setStyle = (id) => {
  //   setItem(id);
  //   // item.current = id;
  // };
  const classes = `flex justify-between items-center px-8 py-2  + ${props.className}`;

  return (
    <nav className={classes}>
      <div>
        <Link href="/">
          <Image
            className="w-[80px]"
            src={Logo}
            alt="Farmkart logo"
            objectFit="cover"
          />
        </Link>
      </div>

      <Navlink />
      <div className="flex gap-2">
        <Link href="/login">
          <SecondaryButton type="button" title="Sign In" />
        </Link>
        <Link href="/signup">
          <PrimaryButton type="button" title="Register" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
