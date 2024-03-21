import { Button, FormControl, FormHelperText } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useRef } from "react";

function RichTextEditorContainer({ formik }: { formik: any }) {
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <div>
      <FormControl
        fullWidth
        error={formik.touched.content && Boolean(formik.errors.content)}
        sx={{
          border:
            formik.touched.content && formik.errors.content
              ? "1px solid #f44336"
              : "1px solid transparent",
          borderRadius: "4px",
        }}
      >
        <RichTextEditor
          name="content"
          ref={rteRef}
          extensions={[StarterKit]}
          content={formik.values.content}
          onChange={(content: any) => {
            console.log("content", content);
            formik.setFieldValue("content", content);
          }}
          renderControls={() => (
            <MenuControlsContainer>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
            </MenuControlsContainer>
          )}
        />
      </FormControl>
      <FormHelperText style={{ color: "#f44336" }}>
        {formik.touched.content && formik.errors.content}
      </FormHelperText>

      <Button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>
        Log HTML
      </Button>
    </div>
  );
}

export default RichTextEditorContainer;