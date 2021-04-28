// Central location for all tools used by editor.js
import Embed from '@editorjs/embed'
import Paragraph from '@editorjs/paragraph'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Quote from '@editorjs/quote'
import CheckList from '@editorjs/checklist'
import InlineCode from '@editorjs/inline-code'

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  paragraph: Paragraph,
  code: Code,
  linkTool: LinkTool,
  quote: Quote,
  checklist: CheckList,
  inlineCode: InlineCode
}
