import { Image, Title } from "@mantine/core";
import Logo from "@/assets/images/logo.png";
import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "react-hook-form-mantine";
import * as yup from "yup";
interface IFormData {
  country: string;
  city: string;
}

const schema = yup.object().shape({
  country: yup.string().required("Country must be not empty"),
  city: yup.string().required("City must be not empty"),
});

export default function Nearbycities() {
  const {
    control,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      country: "",
      city: "",
    },
  });

  return (
    <div>
      <div className="mt-4 w-[700px] rounded-lg mx-auto bg-[#C5DDFF]">
        <Image src={Logo} h={350} radius="lg" fit="contain" />
      </div>

      <div className="mx-auto mt-4 text-center">
        <Title order={2} className="text-cyan-400">
          Nearby citities recommendation system
        </Title>
      </div>

      <div className="flex justify-between gap-4 items-end mx-2">
        <Select
          label="Country"
          placeholder="Choose country"
          required
          name="country"
          size="md"
          radius="md"

          allowDeselect
          data={
            ["Vietnam"]
          }
          searchable
          w={"100%"}
          control={control}
        />

        <Select
          label="City"
          placeholder="Choose city"
          required
          name="city"
          size="md"
          radius="md"

          allowDeselect
          data={
            ["Huế", "Hà Nội"]
          }
          searchable
         
          w={"100%"}
          control={control}
        />
      </div>
    </div>
  );
}
