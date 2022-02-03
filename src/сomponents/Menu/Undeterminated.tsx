import { useTracks } from "features/music/selectors"
import { Menu as Determinated } from "./Menu"
export const Menu = ()=>{
    const tracks = useTracks()
    return <Determinated tracks={tracks} />
}