import { Card } from "@/components/molecules/Card";
import { PillsInput } from "@/components/molecules/PillsInput";
import { Tab } from "@/components/molecules/Tab";
import { getStadiums } from "@/utils/supabase/db/actions";

import { Box, Container, Flex, Grid, Paper } from "@mantine/core";
import { FC } from "react";

const SearchArea: FC = () => {
  return (
    <Flex flex="1" direction="column" gap="md">
      <Paper radius="sm" py="sm">
        <PillsInput />
      </Paper>
    </Flex>
  );
};

export default async function Home() {
  const stadiums = await getStadiums();
  return (
    <Box className="main" p="lg">
      <Container fluid>
        <Tab />
        <SearchArea />
        <Grid>
          {stadiums.map((item) => {
            return <Card key={item.id} {...item} />;
          })}
        </Grid>
      </Container>
    </Box>
  );
}
