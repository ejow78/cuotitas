import { login, signup } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Ingresar</TabsTrigger>
                    <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Iniciar Sesión</CardTitle>
                            <CardDescription>
                                Ingresa tu email y contraseña.
                            </CardDescription>
                        </CardHeader>
                        <form>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password" name="password" type="password" required />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button formAction={login} className="w-full">Ingresar</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
                <TabsContent value="register">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crear Cuenta</CardTitle>
                            <CardDescription>
                                Crea una cuenta para guardar tus datos.
                            </CardDescription>
                        </CardHeader>
                        <form>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password" name="password" type="password" required />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button formAction={signup} className="w-full">Registrarse</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
