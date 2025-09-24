import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesForLab } from './messages.lab';

import { MessageService } from '../../services/message/message.service';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';



describe("2-message component testing:", () => {
    let component: MessagesForLab;
    let fixture: ComponentFixture<MessagesForLab>;
    let messageService: MessageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MessagesForLab],
            providers: [MessageService, provideZonelessChangeDetection()]
        });
        fixture = TestBed.createComponent(MessagesForLab);
        component = fixture.componentInstance;
        messageService = TestBed.inject(MessageService);
    });

    it("expect component template to be empty", () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.msg')).toBeNull();
    });

    it("then expect div.msg to have the messages after setting it", () => {
        messageService.messages.push(
            { id: 1, message: "Test message 1" },
            { id: 2, message: "Test message 2" }
        );
        fixture.detectChanges();

        const msgDivs = fixture.debugElement.queryAll(By.css('.msg'));
        expect(msgDivs.length).toBe(2);
        expect(msgDivs[0].nativeElement.textContent).toContain("Test message 1");
        expect(msgDivs[1].nativeElement.textContent).toContain("Test message 2");
    });
});