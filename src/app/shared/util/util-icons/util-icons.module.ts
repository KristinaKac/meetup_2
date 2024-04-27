import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrizmIconsSvgRegistry } from '@prizm-ui/icons';
import { prizmIconsCircleCheckEmpty, prizmIconsCircleXmark, prizmIconsGear8Edge, prizmIconsUserCircle } from '@prizm-ui/icons/base/source';

@NgModule({
    imports: [CommonModule],
})
export class UtilIconsModule {
    constructor(private readonly iconRegistry: PrizmIconsSvgRegistry) {
        this.iconRegistry.registerIcons([
            prizmIconsGear8Edge,
            prizmIconsCircleXmark,
            prizmIconsCircleCheckEmpty,
            prizmIconsUserCircle
        ])
    }
}