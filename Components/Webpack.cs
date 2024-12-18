using Microsoft.AspNetCore.Mvc;

namespace WebApplicationWebPack.Components
{

    public class Webpack : ViewComponent
    {
        public IViewComponentResult Invoke(string? controller = null)
        {
            if (controller != "Geral")
            {
                string? controllerName = ViewContext.RouteData.Values["controller"]?.ToString().Replace("Controller", "");
                return View($"{controllerName}/index");
            }
            return View("index");
        }
    }
}