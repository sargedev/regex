
namespace regex {

    const TT_START = "START";
    const TT_END = "END";
    const TT_LPAREN = "LPAREN";
    const TT_RPAREN = "RPAREN";
    const TT_LSPAREN = "LSPAREN";
    const TT_RSPAREN = "RSPAREN";
    const TT_LCPAREN = "LCPAREN";
    const TT_RCPAREN = "RCPAREN";

    class Token {
        type: string;
        value: any;

        constructor(type: string, value?: string) {
            this.type = type;
            this.value = value;
        }

        toString(): string {
            let result = this.type;
            if (this.value) result += text.stringify(this.value);
            return result;
        }
    }

    class Match {
        start: number;
        end: number;
        text: string;

        constructor(text: string, start: number, end: number) {
            this.text = text;
            this.start = start;
            this.end = end;
        }

        get span(): number[] {
            return [this.start, this.end];
        }

        toString(): string {
            return `Match(${this.text}, <${this.start}, ${this.end}>)`;
        }
    }

    class Lexer {
        text: string;
        index: number;
        char: string;

        constructor(text: string) {
            this.text = text;
            this.index = -1;
            this.advance();
        }

        advance(): void {
            this.index += 1;
            this.char = this.index < this.text.length ? this.text[this.index] : null;
        }

        makeTokens(): Token[] {
            let tokens = [];

            while (this.char !== null) {
                switch (this.char) {
                    case "^": tokens.push(new Token(TT_START));
                    case "$": tokens.push(new Token(TT_END));
                    case "(": tokens.push(new Token(TT_END));
                    case ")": tokens.push(new Token(TT_END));
                    case "[": tokens.push(new Token(TT_END));
                    case "]": tokens.push(new Token(TT_END));
                    case "{": tokens.push(new Token(TT_END));
                    case "}": tokens.push(new Token(TT_END));
                }
            }
            return tokens;
        }
    }
}