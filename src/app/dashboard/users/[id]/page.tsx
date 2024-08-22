import Header from "@/components/Header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { updateUser } from "@/lib/actions"
import { fetchUser } from "@/lib/data"
import { IUser } from "@/lib/types"
import { User } from "lucide-react"

type Props = {
    params: {
        id: string
    }
}

const UserPage = async ({params}: Props) => {
    const { id } = params;
    const user: IUser = await fetchUser(id);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Header title="Users Details" />
            <Card className="w-full max-w-screen-lg">
                <CardContent>
                    <form action={ updateUser } className="grid gap-4 mt-4" >
                        <input type="hidden" name="_id" value={user._id.toString()} />
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                                <AvatarFallback><User size={32} /></AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="text-xl font-semibold">{user.username}</div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Name</Label>
                            <Input id="username" name="username" type="text" required defaultValue={user.username} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" required defaultValue={user.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" name="phone" defaultValue={user.phone} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="isAdmin" >Is Admin?</Label>
                            <Select id="isAdmin" name="isAdmin" defaultValue={`${user.isAdmin}`}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="false">No</SelectItem>
                                    <SelectItem value="true">Yes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="isActive" >Is Active?</Label>
                            <Select id="isActive" name="isActive" defaultValue={`${user.isActive}`}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="false">No</SelectItem>
                                    <SelectItem value="true">Yes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" name="address" defaultValue={user.address} />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default UserPage