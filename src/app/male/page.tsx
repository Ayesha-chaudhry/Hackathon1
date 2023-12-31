"use client"
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import { use } from "react";
import {client} from "../../../sanity/lib/client";

async function sanityProducts() {
    const response = await client.fetch(`*[_type == "product" && product_category == "male"]{
        _id, title, Price, sub_category, "image": product_image.asset->url
    }`);
    return response;
}

const femaleProducts = sanityProducts();

const Page = () => {
    const products = use(femaleProducts);
    return (
        <div className="grid justify-center gap-10 mt-10">
            <div>
                <div>
                    <h1 className='text-blue-700 font-bold text-sm text-center mt-32'>PRODUCTS</h1>
                    <h1 className='text-4xl font-bold text-center'>Check What We Have</h1>
                </div>
                <div className='grid mobile:grid-cols-1 small:grid-cols-2  tablet:grid-cols-4 gap-20 max-w-[1300px] mx-auto mt-10 '>
                    {
                        products.map((product: any, id: any) => {
                            return <div className='mt-5 mobile:mx-5 tablet:ml-0' key={id}>
                                <Link href={`https://ecommerce-store-hakathon01.vercel.app/productDetail/${product._id}`}>
                                <Image src={product.image} alt='logo' className='h-auto bg-cover' width={400} height={300} />
                                <h1 className="card-title  text-2xl">{product.title}</h1>
                                <h2 className='font-semibold text-lg py-3'>{product.sub_category}</h2>
                                <h2 className='text-xl font-bold'>${product.Price}</h2>
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Page





