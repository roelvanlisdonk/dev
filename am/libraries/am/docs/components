# Components

* Components are just normal modules.
* One component per module.
* Module should export a **component function** with the name of the component, e.g.
    * export function actionButton(options?: ActionButtonOptions): IVirtualDomNode
    * when NO options are supplied the defaultOptions are used.

* Module should export a class NameOfMyComponentOptions that contain:
    * resources
    * colors
    * icons
    * cns - Class Names - 
    * cssRules: Array<ICssRule>
* Module should export a defaultOptions, this is just an instance of the Options class,
  but it will be used when NO options are supplied to the **component function**.
  The defaultOptions can be altered at runtime, so all **instances** of the component will use this new setting.



## vNext
* in vNext we introduce media queries, these are just a collection off cssRules that apply on a certian context.


2017-01-27 14:27:12,223 121795 [13] ERROR MijnZvdZ.Web.MvcApplication Application_Error (null) - Unhandled exception System.Exception: BusinessServicePost - Service: /api/105174373-6c0fe8cd-1ed3-4552-aa40-a541060d6d23/Conversatie/VerwijderDeelherstelMelding
, Token: 105174373-6c0fe8cd-1ed3-4552-aa40-a541060d6d23, Domain: Conversatie, Procedure: VerwijderDeelherstelMelding, Content: 9409794, StatusCode: InternalServerError
   at MijnZvdZ.Service.Adapters.Arbois.ArboisAdapter.<BusinessServicePost>d__39.MoveNext() in C:\Projects\ZvdZ\mijnzvdz\Service\Adapters\Arbois\ArboisAdapter.cs:line 292