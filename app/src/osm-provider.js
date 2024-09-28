export default{
    maptiler:{
        url:`https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}@2x.png?key=${import.meta.env.VITE_MAP_API_KEY}`,
        attribution:'&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
}