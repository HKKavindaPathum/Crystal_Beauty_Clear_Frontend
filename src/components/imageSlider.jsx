import { useState } from "react"

export default function ImageSlider(props){
    const images = props.images
    const [currentIndex, setCurrentIndex] = useState(0)

    return(
        <div className="w-full max-w-[500px] flex flex-col items-center">
            <div className="w-full aspect-[4/5] shrink-0 max-h-[500px] overflow-hidden rounded-3xl shadow-md border dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-surface)]">
                <img src={images[currentIndex]} className="w-full h-full object-cover" />
            </div>
            <div className="w-full flex justify-center items-center gap-2 mt-4 overflow-x-auto py-2">
                {images?.map((image, index) => {
                    return (
                        <img 
                            key={index} 
                            className={`w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl object-cover cursor-pointer hover:border-2 hover:border-accent transition-all ${index === currentIndex ? "border-accent border-2" : "border border-gray-200 dark:border-gray-700"}`} 
                            src={image} 
                            onClick={() => setCurrentIndex(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
}