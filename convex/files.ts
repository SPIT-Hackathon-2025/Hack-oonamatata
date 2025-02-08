 import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const files = await ctx.db.query("files").collect();
    return files.map((file) => ({
      id: file._id,
      name: file.name,
      type: file.type,
      content: file.content,
      parentId: file.parentId,
    }));
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    content: v.optional(v.string()),
    parentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const fileId = await ctx.db.insert("files", {
      userId,
      name: args.name,
      type: args.type,
      content: args.content,
      parentId: args.parentId,
    });

    return fileId;
  },
});

export const update = mutation({
  args: {
    id: v.id("files"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    await ctx.db.patch(args.id, {
      content: args.content,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    await ctx.db.delete(args.id);
  },
});