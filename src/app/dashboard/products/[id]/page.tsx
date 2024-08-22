import Header from "@/components/Header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { updateProduct } from "@/lib/actions"
import { fetchProduct } from "@/lib/data"
import { IProduct } from "@/lib/types"
import { User } from "lucide-react"

type Props = {
    params: {
        id: string
    }
}

const ProductPage = async ({params}: Props) => {

    const id = params.id

    const product: IProduct = await fetchProduct(id)

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Header title="Product Details" />
            <Card className="w-full max-w-screen-lg">
                <CardContent>
                    <form action={ updateProduct } className="grid gap-4 mt-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                                <AvatarFallback><User size={ 32 } /></AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="text-xl font-semibold">{ product.title }</div>
                            </div>
                        </div>
                        <input type="hidden" name="_id" value={product._id.toString()} />
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" type="text" required defaultValue={product.title} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={product.description} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select id="category" >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="clothing">Clothing</SelectItem>
                                    <SelectItem value="home">Home</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="kitchen">Kitchen</SelectItem>
                                    <SelectItem value="toys">Toys</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" type="number" name="price" defaultValue={product.price} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" type="number" name="stock" defaultValue={product.stock} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="color">Color</Label>
                            <Input id="color" type="text" name="color" defaultValue={product.color} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="size">Size</Label>
                            <Input id="size" type="text" name="size" defaultValue={product.size} />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

export default ProductPage