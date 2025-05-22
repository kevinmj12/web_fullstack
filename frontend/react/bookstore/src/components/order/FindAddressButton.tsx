import Button from "../common/Button";
import { useEffect } from "react";
import { SCRIPT_URL } from "../../constants/address";

interface FindAddressButtonProps {
  onCompleted: (address: string) => void;
}

const FindAddressButton: React.FC<FindAddressButtonProps> = ({
  onCompleted,
}) => {
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
      주소 찾기
    </Button>
  );
};

export default FindAddressButton;
