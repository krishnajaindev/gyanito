import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
const Heaader = () => {
    return(
        <>
            <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link to="/Login">Documentation</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
        </>
    )
}
export default Heaader;