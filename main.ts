
namespace regex {
    class Match {
        start: number;
        end: number;
        text: string;

        constructor(text: string, start: number, end: number) {
            this.text = text;
            this.start = start;
            this.end = end;
        }
    }
}