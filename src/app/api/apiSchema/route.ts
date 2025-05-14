import { NextResponse } from "next/server";
import generateOpenApiSpec from "@omer-x/next-openapi-json-generator";
import validations from "@/utils/validations";
import models from "@/utils/models";

import { promises as fs } from "fs";
import path from "path";

export const GET = async () => {
  try {
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        {
          success: false,
        },
        { status: 403 }
      );
    }
    const spec = await generateOpenApiSpec(
      {
        ...validations,
        ...models,
      },
      {
        // options
      }
    );

    const filePath = path.join(process.cwd(), "openapi.json");
    await fs.writeFile(filePath, JSON.stringify(spec, null, 2));
    console.log(`OpenAPI specification written to ${filePath}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 400 }
    );
  }
};
