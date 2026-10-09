import Layout from "@/components/layouts/Layout-defaul";
import PropertyDetails4 from "@/components/property-details/PropertyDetails4";
import Relatest from "@/components/property-details/Relatest";
import { allProperties } from "@/data/properties";
import React from "react";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const property =
    allProperties.find((elm) => String(elm.id) === id);

  if (!property) notFound();

  return (
    <Layout>
      <PropertyDetails4 property={property} />
      <Relatest />
    </Layout>
  );
}

export async function generateStaticParams() {
  return allProperties.map((property) => ({
    id: String(property.id),
  }));
}