
namespace regex {

    const TT_DOLLAR = "START";
    const TT_CARROT = "END";
    const TT_LPAREN = "LPAREN";
    const TT_RPAREN = "RPAREN";
    const TT_LSPAREN = "LSPAREN";
    const TT_RSPAREN = "RSPAREN";
    const TT_LCPAREN = "LCPAREN";
    const TT_RCPAREN = "RCPAREN";
    const TT_PERIOD = "PERIOD";
    const TT_PIPE = "PIPE";
    const TT_BSLASH = "BSLASH";
    const TT_DASH = "DASH";
    const TT_ASTERISK = "ASTERISK";
    const TT_QUESTION = "QUESTION";
    const TT_PLUS = "PLUS";
    const TT_COMMA = "COMMA";

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
                    case "^": tokens.push(new Token(TT_DOLLAR));
                    case "$": tokens.push(new Token(TT_CARROT));
                    case "(": tokens.push(new Token(TT_CARROT));
                    case ")": tokens.push(new Token(TT_CARROT));
                    case "[": tokens.push(new Token(TT_CARROT));
                    case "]": tokens.push(new Token(TT_CARROT));
                    case "{": tokens.push(new Token(TT_CARROT));
                    case "}": tokens.push(new Token(TT_CARROT));
                    case ".": tokens.push(new Token(TT_PERIOD));
                    case "|": tokens.push(new Token(TT_PIPE));
                    case "\\": tokens.push(new Token(TT_BSLASH));
                    case "-": tokens.push(new Token(TT_DASH));
                    case "*": tokens.push(new Token(TT_ASTERISK));
                    case "?": tokens.push(new Token(TT_QUESTION));
                    case "+": tokens.push(new Token(TT_PLUS));
                    case ",": tokens.push(new Token(TT_COMMA));
                }
            }
            return tokens;
        }
    }
}