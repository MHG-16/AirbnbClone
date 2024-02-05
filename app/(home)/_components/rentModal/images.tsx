import ImageUpload from "@/app/components/input/ImageUpload";
import Heading from "../heading";

interface ImagesCountainerProps {
    imageSrc: string;
    setCustomValue: (id: string, value: any) => void;
}

const ImagesCountainer: React.FC<ImagesCountainerProps> = ({
    imageSrc,
    setCustomValue
}) => {
  return (
    <div className="flex flex-col gap-8">
        <Heading
            title="Add a new Image of your place"
            subtitle="Show guests what your place looks like"
        />
        <ImageUpload 
            value={imageSrc}
            onChange={(value) => setCustomValue('imageSrc', value)}
        />
    </div>
  )
}

export default ImagesCountainer