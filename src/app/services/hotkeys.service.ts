import { Inject, Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HotkeysDialogComponent } from '../components/hotkeys-dialog/hotkeys-dialog.component';

interface Options {
    element: any;
    keys: string;
    description: string;
}

@Injectable({ providedIn: 'root' })
export class Hotkeys {

    hotkeys: Map<string, string> = new Map<string, string>();

    defaults: Partial<Options> = {
        element: this.document
    };

    constructor(private eventManager: EventManager,
                private dialog: MatDialog,
                @Inject(DOCUMENT) private document: Document) {

        this.addShortcut({ keys: 'shift.?', description: 'open shortcut dialog' }).subscribe(() => {
            this.openHelpModal();
        });
    }

    addShortcut(options: Partial<Options>) {
        const merged = { ...this.defaults, ...options };
        const event = `keydown.${merged.keys}`;

        this.hotkeys.set(merged.keys, merged.description);

        return new Observable(observer => {
            const handler = (e) => {
                e.preventDefault();
                observer.next(e);
            };

            const dispose = this.eventManager.addEventListener(
                merged.element, event, handler
            );

            return () => {
                dispose();
                this.hotkeys.delete(merged.keys);
            };
        });
    }

    openHelpModal() {
        this.dialog.open(HotkeysDialogComponent, {
            width: '500px',
            data: this.hotkeys
          });
    }

}
