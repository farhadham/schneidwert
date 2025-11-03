CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"accountId" varchar NOT NULL,
	"provider_id" varchar NOT NULL,
	"access_token" varchar,
	"refresh_token" varchar,
	"access_token_expires_at" timestamp (0) with time zone,
	"refresh_token_expires_at" timestamp (0) with time zone,
	"scope" varchar,
	"id_token" varchar,
	"password" varchar,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (0) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text NOT NULL,
	"material_id" uuid NOT NULL,
	"thickness_id" uuid NOT NULL,
	"cut_length_mm" numeric(12, 2) NOT NULL,
	"holes_count" integer DEFAULT 0 NOT NULL,
	"setup_min" numeric(10, 2) DEFAULT '0',
	"post_min" numeric(10, 2) DEFAULT '0',
	"engrave_length_mm" numeric(10, 2) DEFAULT '0',
	"qty" integer DEFAULT 1 NOT NULL,
	"override_machine_eur_min" numeric(10, 2),
	"margin_pct" numeric(5, 2) DEFAULT '0',
	"result_price_per_unit" numeric(10, 2),
	"result_total" numeric(10, 2),
	"customer_name" text,
	"notes" text,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (0) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "material" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (0) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "material_thickness" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"material_id" uuid NOT NULL,
	"thickness_mm" numeric(10, 2) NOT NULL,
	"cut_cost_per_m" numeric(10, 2) NOT NULL,
	"drill_secs_per_hole" numeric(10, 2) NOT NULL,
	"engrave_cost_per_m" numeric(10, 2),
	"notes" text,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (0) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp (0) with time zone NOT NULL,
	"ip_address" varchar,
	"user_agent" varchar,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" varchar NOT NULL,
	"value" varchar NOT NULL,
	"expires_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (0) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_material_id_material_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."material"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_thickness_id_material_thickness_id_fk" FOREIGN KEY ("thickness_id") REFERENCES "public"."material_thickness"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "material_thickness" ADD CONSTRAINT "material_thickness_material_id_material_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."material"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;