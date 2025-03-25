const OFFSET = 120;// 滑入偏移量
const map = new WeakMap();
const obs = new IntersectionObserver(entrys=>{
    entrys.forEach(entry=>{
        if(entry.isIntersecting){
            const animation = map.get(entry.target);
            if(animation){
                animation.play();
                obs.unobserve(entry.target);
            }
            
        }
    })
});
function belowViewport(el){
    const rect = el.getBoundingClientRect();
    return rect.top > window.innerHeight;
}
export default{
    directives:{
        "myslide-in":{
            mounted(el){
                if(!belowViewport(el)){
                    return
                }
                const animation = el.animate([
                    {
                        transform:`translateY(${OFFSET}px)`,
                        opacity:0.6
                    },
                    {
                        transform:`translateY(0)`,
                        opacity:1
                    },
                ],{
                    duration:500,
                    easing:'ease-out',
                    fill:'forwards'
                })
                animation.pause();
                obs.observe(el);
                map.set(el,animation);
            },
            unmounted(el){
                obs.unobserve(el);
            }
        }
    }
}